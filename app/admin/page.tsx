import { Navbar } from "@/components/navbar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { fetchMovies } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Plus, Play, TrendingUp, History, Film, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ViewershipChart } from "@/components/viewership-chart"

export default async function AdminPage() {
  const movies = await fetchMovies()
  const totalMovies = movies.length
  const recentMovies = movies.filter((m) => m.year === 2024).length

  const activityData = [
    { day: "Mon", views: 2400 },
    { day: "Tue", views: 1398 },
    { day: "Wed", views: 9800 },
    { day: "Thu", views: 3908 },
    { day: "Fri", views: 4800 },
    { day: "Sat", views: 3800 },
    { day: "Sun", views: 4300 },
  ]

  return (
    <section className="flex-1 space-y-8 p-6 md:p-12">
      {/* Command Center header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
        <p className="text-muted-foreground">High-level insights and system status.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovies}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128.4k</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Added (7d)</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{recentMovies}</div>
            <p className="text-xs text-muted-foreground">New content frequency: High</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Genre</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sci-Fi</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Viewership Trends</CardTitle>
            <CardDescription>Daily stream counts for the past 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ViewershipChart data={activityData}/>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 5 administrative actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                  {[
                    { user: "Alex", action: "Added 'Blade Runner'", time: "2h ago" },
                    { user: "Sam", action: "Updated Settings", time: "4h ago" },
                    { user: "Jordan", action: "Deleted User Account", time: "6h ago" },
                    { user: "Alex", action: "Added 'Inception'", time: "1d ago" },
                    { user: "System", action: "Backup Completed", time: "1d ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <History className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/movies?action=new">
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start gap-1 p-4 text-left bg-transparent"
            >
              <Plus className="h-5 w-5 text-primary" />
              <span className="font-bold">Add New Movie</span>
              <span className="text-xs text-muted-foreground">Upload content and metadata</span>
            </Button>
          </Link>
          <Link href="/admin/movies">
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start gap-1 p-4 text-left bg-transparent"
            >
              <Film className="h-5 w-5 text-primary" />
              <span className="font-bold">Manage Library</span>
              <span className="text-xs text-muted-foreground">Edit existing titles and genres</span>
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start gap-1 p-4 text-left bg-transparent"
            >
              <SettingsIcon className="h-5 w-5 text-primary" />
              <span className="font-bold">System Settings</span>
              <span className="text-xs text-muted-foreground">Configure global app preferences</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
