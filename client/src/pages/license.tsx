import { Link } from "wouter";
import { ArrowLeft, Shield, Download, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";

export default function License() {
  const licenseTypes = [
    {
      title: "Personal License",
      price: "Free",
      icon: Users,
      description: "For personal projects and learning",
      features: [
        "Use for personal projects",
        "Educational purposes",
        "Non-commercial use only",
        "Attribution required",
        "No redistribution rights"
      ],
      restrictions: [
        "Cannot be used for commercial projects",
        "Cannot be resold or redistributed",
        "Must credit original creator"
      ]
    },
    {
      title: "Commercial License",
      price: "Varies",
      icon: Shield,
      description: "For commercial and business use",
      features: [
        "Use in commercial projects",
        "No attribution required",
        "Extended usage rights",
        "Priority support",
        "Bulk licensing available"
      ],
      restrictions: [
        "Cannot be redistributed as-is",
        "Cannot be used to create competing platforms",
        "License is non-transferable"
      ]
    },
    {
      title: "Extended License",
      price: "Premium",
      icon: Download,
      description: "Maximum flexibility and rights",
      features: [
        "Unlimited commercial use",
        "Modification rights",
        "Resale rights (modified)",
        "White-label usage",
        "Dedicated support"
      ],
      restrictions: [
        "Cannot sell original unmodified files",
        "Cannot claim original authorship"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">License Information</h1>
          <p className="text-xl text-slate-600">
            Understand your rights and obligations when using ContentHub assets
          </p>
        </div>

        {/* Overview */}
        <div className="mb-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-blue-900">Important License Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-blue-800">
              <p className="mb-4">
                All content on ContentHub is protected by copyright and is licensed, not sold. 
                When you download content, you are purchasing a license to use that content according 
                to the specific terms outlined below.
              </p>
              <p>
                Please read these license terms carefully. Different content may have different 
                licensing options available. Always check the specific license associated with 
                each item before use.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* License Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-8">License Types</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {licenseTypes.map((license, index) => {
              const Icon = license.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{license.title}</CardTitle>
                          <Badge variant="outline">{license.price}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{license.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">✓ What you can do:</h4>
                      <ul className="space-y-2">
                        {license.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">✗ Restrictions:</h4>
                      <ul className="space-y-2">
                        {license.restrictions.map((restriction, restrictionIndex) => (
                          <li key={restrictionIndex} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-red-600 font-bold">•</span>
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* General Terms */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>General License Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h3>Duration and Termination</h3>
              <p>
                Licenses are perpetual unless terminated. ContentHub reserves the right to 
                terminate licenses if terms are violated. Upon termination, you must cease 
                all use and destroy all copies of the licensed content.
              </p>

              <h3>Liability and Warranties</h3>
              <p>
                Content is provided "as is" without warranties. ContentHub is not liable for 
                any damages arising from the use of licensed content. Users are responsible 
                for ensuring content is appropriate for their intended use.
              </p>

              <h3>Copyright and Ownership</h3>
              <p>
                All content remains the property of its original creators. Licenses grant 
                usage rights but do not transfer ownership. Original creators retain all 
                copyrights and moral rights to their work.
              </p>

              <h3>Modifications and Derivatives</h3>
              <p>
                Depending on your license type, you may be permitted to modify content. 
                Any modifications do not grant you ownership of the original work. 
                Check your specific license for modification rights.
              </p>

              <h3>Attribution Requirements</h3>
              <p>
                Some licenses require attribution to the original creator. When required, 
                attribution should include the creator's name, the title of the work, 
                and a link to the original source when possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions About Licensing?</CardTitle>
              <CardDescription>
                If you have questions about licensing or need clarification on usage rights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link href="/contact">
                  <Button>Contact Legal Team</Button>
                </Link>
                <Link href="/help-center">
                  <Button variant="outline">Visit Help Center</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}