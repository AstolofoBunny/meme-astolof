import { Link } from "wouter";
import { ArrowLeft, Search, MessageCircle, Book, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";

export default function HelpCenter() {
  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of ContentHub and how to navigate the platform",
      articles: [
        "How to browse content",
        "Creating your first account",
        "Understanding categories",
        "Downloading files"
      ]
    },
    {
      icon: MessageCircle,
      title: "Content Management",
      description: "Learn how to create and manage your content",
      articles: [
        "Creating posts",
        "Uploading files",
        "Setting prices",
        "Managing categories"
      ]
    },
    {
      icon: Shield,
      title: "Account & Security",
      description: "Manage your account settings and security",
      articles: [
        "Account settings",
        "Privacy controls",
        "Two-factor authentication",
        "Password management"
      ]
    },
    {
      icon: Search,
      title: "Troubleshooting",
      description: "Common issues and how to resolve them",
      articles: [
        "Upload problems",
        "Download issues",
        "Login troubles",
        "Payment questions"
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Help Center</h1>
          <p className="text-xl text-slate-600">Find answers to your questions and learn how to use ContentHub</p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for help articles..."
            className="pl-12 py-4 text-lg"
          />
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Articles */}
        <div className="bg-white rounded-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">How to upload and manage files</h3>
                <p className="text-sm text-slate-600">Learn the best practices for uploading content</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">Setting up pricing for your content</h3>
                <p className="text-sm text-slate-600">Guide to pricing strategies and payment setup</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">Understanding content categories</h3>
                <p className="text-sm text-slate-600">How to organize and categorize your uploads</p>
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">Account security best practices</h3>
                <p className="text-sm text-slate-600">Keep your account safe and secure</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">Downloading and licensing</h3>
                <p className="text-sm text-slate-600">Understanding download rights and usage terms</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">Community guidelines</h3>
                <p className="text-sm text-slate-600">Rules and best practices for our community</p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}