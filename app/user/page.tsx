import { UserProfile } from "@/components/user-profile"
import { UserStats } from "@/components/user-stats"
import { SavedIdeas } from "@/components/saved-ideas"
import { RecentActivity } from "@/components/recent-activity"
import { AccountSettings } from "@/components/account-settings"

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading">Your Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile, track your progress, and review your ideas.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <UserStats />
            <SavedIdeas />
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <UserProfile />
            <AccountSettings />
          </div>
        </div>
      </div>
    </div>
  )
}
