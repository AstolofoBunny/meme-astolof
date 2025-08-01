import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Plus, Minus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Header from "@/components/header";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          id: "getting-started-1",
          question: "How do I create an account?",
          answer: "To create an account, click the 'Sign In' button in the top navigation and choose 'Sign in with Google'. You can also browse content without an account, but you'll need to sign in to access the admin panel and create content."
        },
        {
          id: "getting-started-2",
          question: "Is ContentHub free to use?",
          answer: "Yes! ContentHub is free to browse and many items are available for free download. Some premium content may require payment, but basic platform access is completely free."
        },
        {
          id: "getting-started-3",
          question: "How do I navigate the platform?",
          answer: "Use the main navigation to browse different sections: Home for browsing content, News for platform updates, and Admin for content management. You can also use the search bar to find specific content."
        }
      ]
    },
    {
      title: "Content & Downloads",
      questions: [
        {
          id: "content-1",
          question: "What types of content can I find on ContentHub?",
          answer: "ContentHub hosts a variety of digital assets including Warcraft 3 maps, Minecraft resources, 3D models, books, and other creative assets. Content is organized by categories for easy browsing."
        },
        {
          id: "content-2",
          question: "How do I download content?",
          answer: "Find the content you want and click the download button. Some content is free while others may require payment. The download will start automatically once you have the proper permissions."
        },
        {
          id: "content-3",
          question: "What file formats are supported?",
          answer: "We support a wide variety of file formats including images (JPEG, PNG, WebP), documents (PDF, DOC), archive files (ZIP, RAR), and more. Specific format support may vary by content category."
        },
        {
          id: "content-4",
          question: "Are there download limits?",
          answer: "There are no download limits for free content. For paid content, you can download as many times as needed after purchase. We track download counts for analytics purposes."
        }
      ]
    },
    {
      title: "Creating Content",
      questions: [
        {
          id: "creating-1",
          question: "How do I upload content?",
          answer: "Sign in to your account and visit the Admin panel. From there, you can create new posts by clicking 'New Post', filling out the details, and uploading your files using our drag-and-drop interface."
        },
        {
          id: "creating-2",
          question: "What file size limits apply?",
          answer: "Individual files can be up to 100MB in size. For larger files, consider compressing them or breaking them into smaller parts. Contact support if you need to upload larger assets."
        },
        {
          id: "creating-3",
          question: "How do I set pricing for my content?",
          answer: "When creating a post, you can set a price in the price field. Set it to '0' for free content. Pricing is flexible and you can update it anytime by editing your post."
        },
        {
          id: "creating-4",
          question: "Can I edit content after publishing?",
          answer: "Yes! You can edit your posts anytime from the Admin panel. Click the edit button next to any of your posts to update the title, description, files, or pricing."
        }
      ]
    },
    {
      title: "Account & Security",
      questions: [
        {
          id: "account-1",
          question: "How do I update my profile?",
          answer: "Click on your profile avatar in the top navigation and select 'Profile' to update your display name and other account settings."
        },
        {
          id: "account-2",
          question: "Is my data secure?",
          answer: "Yes, we use industry-standard security practices including encrypted connections (HTTPS) and secure authentication through Google's OAuth system."
        },
        {
          id: "account-3",
          question: "How do I delete my account?",
          answer: "To delete your account, please contact our support team. We'll help you remove your account and associated data according to our privacy policy."
        }
      ]
    },
    {
      title: "Technical Issues",
      questions: [
        {
          id: "technical-1",
          question: "Why won't my file upload?",
          answer: "Check that your file is under 100MB and in a supported format. Ensure you have a stable internet connection. If issues persist, try refreshing the page and attempting the upload again."
        },
        {
          id: "technical-2",
          question: "The website is loading slowly. What can I do?",
          answer: "Try refreshing the page or clearing your browser cache. Check your internet connection. If the issue persists, it may be temporary server load - please try again in a few minutes."
        },
        {
          id: "technical-3",
          question: "I can't sign in. What should I do?",
          answer: "Make sure you're using the same Google account you used to sign up. Check if you have popup blockers that might prevent the sign-in window from opening. Clear your browser cache and cookies if needed."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-600">Find quick answers to common questions about ContentHub</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3"
          />
        </div>

        {/* FAQ Content */}
        {filteredCategories.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-600">No FAQ items found matching your search.</p>
          </Card>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">{category.title}</h2>
                <div className="space-y-2">
                  {category.questions.map((faq) => (
                    <Card key={faq.id}>
                      <Collapsible
                        open={openItems.includes(faq.id)}
                        onOpenChange={() => toggleItem(faq.id)}
                      >
                        <CollapsibleTrigger className="w-full">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-left font-medium text-slate-900 pr-4">
                                {faq.question}
                              </h3>
                              {openItems.includes(faq.id) ? (
                                <Minus className="w-5 h-5 text-slate-500 flex-shrink-0" />
                              ) : (
                                <Plus className="w-5 h-5 text-slate-500 flex-shrink-0" />
                              )}
                            </div>
                          </CardContent>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0 pb-6 px-6">
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button>Contact Support</Button>
              </Link>
              <Link href="/help-center">
                <Button variant="outline">Visit Help Center</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}