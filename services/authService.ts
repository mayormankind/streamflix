import Admin, { IAdmin } from '@/models/Admin';
import dbConnect from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  admin?: {
    id: string;
    email: string;
    role: string;
  };
  message?: string;
}

export class AuthService {
  /**
   * Generate JWT token
   */
  private static generateToken(adminId: string): string {
    return jwt.sign({ id: adminId, role: 'admin' }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): { id: string; role: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        role: string;
      };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**
   * Login admin
   */
  static async login(credentials: LoginDto): Promise<AuthResponse> {
    await dbConnect();

    try {
      // Find admin with password field
      const admin = await Admin.findOne({ email: credentials.email }).select(
        '+password'
      );

      if (!admin) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Check password
      const isPasswordValid = await admin.comparePassword(credentials.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Generate token
      const token = this.generateToken(admin._id.toString());

      return {
        success: true,
        token,
        admin: {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  }

  /**
   * Register a new admin
   */
  static async register(userData: RegisterDto): Promise<AuthResponse> {
    await dbConnect();

    try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: userData.email });

      if (existingAdmin) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }

      // Create new admin
      const admin = await Admin.create({
        email: userData.email,
        password: userData.password,
        role: 'admin',
      });

      // Generate token
      const token = this.generateToken(admin._id.toString());

      return {
        success: true,
        token,
        admin: {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        },
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration',
      };
    }
  }

  /**
   * Get admin by ID
   */
  static async getAdminById(id: string): Promise<IAdmin | null> {
    await dbConnect();

    try {
      const admin = await Admin.findById(id).lean();
      return admin as IAdmin | null;
    } catch (error) {
      return null;
    }
  }
}
