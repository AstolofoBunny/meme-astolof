import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import News from "@/pages/news";
import Profile from "@/pages/profile";
import HelpCenter from "@/pages/help-center";
import Contact from "@/pages/contact";
import License from "@/pages/license";
import FAQ from "@/pages/faq";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/news" component={News} />
      <Route path="/profile" component={Profile} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/contact" component={Contact} />
      <Route path="/license" component={License} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserRoleProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </UserRoleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
