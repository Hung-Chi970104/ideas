import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, CreditCard, Bell, Shield } from "lucide-react"

export function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-sm">
                Email notifications
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="idea-alerts" className="text-sm">
                New idea alerts
              </Label>
              <Switch id="idea-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-digest" className="text-sm">
                Weekly digest
              </Label>
              <Switch id="weekly-digest" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Account Management</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing & Subscription
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Privacy & Security
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Bell className="mr-2 h-4 w-4" />
              Notification Settings
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button variant="destructive" size="sm" className="w-full">
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
