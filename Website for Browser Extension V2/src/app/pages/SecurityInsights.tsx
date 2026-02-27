import { useParams, Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Progress } from '../components/ui/progress';
import { Star, ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useState } from 'react';

export function SecurityInsights() {
  const { domain } = useParams();
  const [userName, setUserName] = useState('');
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);

  // Mock data - in a real app, this would come from your AI analysis
  const siteData = {
    domain: domain || 'amazon.com',
    logo: 'https://logo.clearbit.com/' + (domain || 'amazon.com'),
    riskScore: 12,
    securityHistory: {
      dataBreaches: 'Dec 4',
      serverCrash: 'Aug 22',
    },
    detailedAnalysis: {
      security: {
        score: 88,
        text: 'Good HTTPS implementation. TLS 1.3 with optimal ciphers detected.',
      },
      phishing: {
        score: 95,
        text: 'Brand-blind domain (EPC service) with added phishing header.',
      },
      tracking: {
        score: 45,
        text: 'Probable Facebook pixels and fingerprinting scripts.',
      },
      aiFlags: {
        score: 92,
        text: 'No suspicious patterns. High transparency.',
      },
    },
    trustedSites: [
      'https://www.wikipedia.org',
      'https://archive.org',
      'https://www.gutenberg.org',
      'https://www.khanacademy.org',
      'https://www.nasa.gov',
      'https://www.nih.gov',
      'https://www.data.gov',
      'https://www.cbcc.com/news',
      'https://www.duolingo.com',
    ],
  };

  // Determine risk score color
  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-orange-500';
    return 'text-red-600';
  };

  const handleSubmitReview = () => {
    // In a real app, this would submit the review to your backend
    console.log('Review submitted:', { userName, userReview, userRating });
    // Reset form
    setUserName('');
    setUserReview('');
    setUserRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Site Header Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-900 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-white rounded-lg border-2 border-gray-900 flex items-center justify-center p-4">
                    <img 
                      src={siteData.logo} 
                      alt={siteData.domain}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="50" x="50" text-anchor="middle" dy=".3em" font-size="48"%3E🌐%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Is {siteData.domain} safe?
                    </h1>
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                      Add to Dashboard
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className={`text-3xl font-bold ${getRiskScoreColor(siteData.riskScore)} mb-1`}>
                    Risk Score: {siteData.riskScore}%
                  </div>
                  <div className="text-gray-900 font-semibold">Security History:</div>
                  <div className="text-gray-700">Data breach on {siteData.securityHistory.dataBreaches}</div>
                  <div className="text-gray-700">Server Crash on {siteData.securityHistory.serverCrash}</div>
                  <div className="text-gray-700">...</div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis Report */}
            <div className="bg-white rounded-2xl border-2 border-gray-900 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Detailed Analysis Report
              </h2>

              <div className="space-y-6">
                {/* Security */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Security</h3>
                    <span className="text-sm text-gray-600">{siteData.detailedAnalysis.security.score}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${siteData.detailedAnalysis.security.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{siteData.detailedAnalysis.security.text}</p>
                </div>

                {/* Phishing Signals */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Phishing Signals</h3>
                    <span className="text-sm text-gray-600">{siteData.detailedAnalysis.phishing.score}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${siteData.detailedAnalysis.phishing.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{siteData.detailedAnalysis.phishing.text}</p>
                </div>

                {/* Tracking Risks */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Tracking Risks</h3>
                    <span className="text-sm text-gray-600">{siteData.detailedAnalysis.tracking.score}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-yellow-500"
                      style={{ width: `${siteData.detailedAnalysis.tracking.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{siteData.detailedAnalysis.tracking.text}</p>
                </div>

                {/* AI Flags */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">AI Flags</h3>
                    <span className="text-sm text-gray-600">{siteData.detailedAnalysis.aiFlags.score}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${siteData.detailedAnalysis.aiFlags.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{siteData.detailedAnalysis.aiFlags.text}</p>
                </div>
              </div>
            </div>

            {/* User Reports */}
            <div className="bg-white rounded-2xl border-2 border-gray-900 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                User Reports
              </h2>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">User2361242692194</div>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="size-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700">
                      This site is very cool and awesome! I've never had any problems with it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add User Review */}
              <div className="mt-8">
                <div className="flex items-start gap-2 mb-4">
                  <MessageSquare className="size-6 text-gray-900" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Your Name:</label>
                    <Input
                      type="text"
                      placeholder="Enter your name..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full border-2 border-gray-900 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Your Rating:</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`size-6 cursor-pointer transition-colors ${
                              star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-gray-400'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">Your Review:</label>
                    <Textarea
                      placeholder="Share your experience good or bad..."
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      className="w-full border-2 border-gray-900 rounded-lg min-h-32"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmitReview}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8 h-12 font-semibold"
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trusted Websites */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-gray-900 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                More trusted websites
              </h2>
              <ul className="space-y-2">
                {siteData.trustedSites.map((site, index) => (
                  <li key={index}>
                    <a 
                      href={site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm break-all"
                    >
                      {site}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Try it for yourself CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Try it for yourself.
          </h2>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-8 h-12">
              Get it NOW →
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}