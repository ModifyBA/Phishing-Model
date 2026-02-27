import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import illustration from 'figma:asset/c17c99e05356c9e3f54e815b5fe5f3a18f5a00fa.png';
import screenshot1 from 'figma:asset/acc15ab6cd93f590e0fc9fdce7bb7c3db7a15729.png';
import browserBar from 'figma:asset/daf35ebd56601a213a07784119c0f2985cbd2a9c.png';
import dashboardView from 'figma:asset/c4e6a8593853acce5acc3dcca8546c97d954c90b.png';
import fullWebsiteView from 'figma:asset/6bcd30ca2cf6ca17a5b7e6a982a99c85907d0026.png';

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between gap-12 max-w-6xl mx-auto">
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-gray-700 mb-6">
                  How does RiskLens work?
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  RiskLens is an AI-powered browser extension that acts as a real-time safety scout for your web browsing. 
                  Whenever you visit a website, it automatically analyzes key risk factors—such as the site's history of data breaches, 
                  the number of hidden trackers, the strength of its security protocols, and suspicious behaviors like excessive redirects. 
                  It then instantly synthesizes this information into a simple, easy-to-understand risk score, which is displayed directly in your browser. 
                  This allows you to see the potential danger to your data at a glance, empowering you to make informed decisions about which sites to trust and use. 
                  Here we'll go over step by step how to use RiskLens, exactly how it works, and what you can do with it
                </p>
              </div>
              <div className="flex-shrink-0">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1676282827740-7360534b7e75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmlhbCUyMGd1aWRlJTIwaW5zdHJ1Y3Rpb24lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzcxMjIwNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tutorial guide illustration" 
                  className="w-56 h-auto rounded-lg" 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          {/* User Guide Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              RiskLens' browser extension user guide
            </h2>
            
            <p className="text-gray-600 text-lg mb-8">
              To check whether the extension is installed, take a look at the top bar of your browser. If the extension 
              is active, you'll see the RiskLens icon
            </p>

            {/* Browser Screenshot */}
            <div className="mb-12 bg-gray-50 p-8 rounded-2xl">
              <img 
                src={browserBar}
                alt="Browser extension in toolbar" 
                className="w-full max-w-3xl mx-auto rounded-lg border border-gray-200"
              />
            </div>

            <p className="text-gray-600 text-lg mb-8">
              Once the extension is installed, when browsing different websites you should see a small window in the 
              corner of your browser letting you know how safe the website you're on is.
            </p>

            {/* Amazon Example Screenshot */}
            <div className="mb-12">
              <img 
                src={screenshot1}
                alt="RiskLens popup showing website safety rating" 
                className="w-full rounded-lg border border-gray-200"
              />
            </div>

            <p className="text-gray-600 text-lg">
              This will let you know if your website is trusted, risked, or dangerous. If you want a more detailed look 
              you can click the window to open a smaller version of our dashboard where you can see the websites risk score, 
              history, and reasoning for it's rating
            </p>
          </div>

          {/* Detailed Dashboard Section */}
          <div className="mb-20">
            <img 
              src={dashboardView}
              alt="Detailed dashboard view" 
              className="w-full rounded-lg border border-gray-200 mb-8"
            />
            <p className="text-gray-600 text-lg">
              From here you can rate your experience, save the website to your dashboard, or be taken to our website 
              for a full in depth breakdown of the website, its saftey risks, safer alternatives, and more.
            </p>
          </div>

          {/* Full Website View Section */}
          <div className="mb-20">
            <img 
              src={fullWebsiteView}
              alt="Full website view" 
              className="w-full rounded-lg border border-gray-200 mb-8"
            />
            <p className="text-gray-600 text-lg">
              This is a full view of the website's safety analysis, providing a comprehensive overview of the risks and 
              recommendations to enhance your online security.
            </p>
          </div>

          {/* Try It Section */}
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Try it for yourself.
            </h2>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12 text-lg">
              Get a Demo →
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}