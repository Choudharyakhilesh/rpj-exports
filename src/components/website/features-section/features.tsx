import { Truck, Shield, CreditCard, Headphones, RefreshCw, Award } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50',
      color: 'from-blue-500 to-cyan-500',
      delay: '0s',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure transactions',
      color: 'from-green-500 to-emerald-500',
      delay: '0.1s',
    },
    {
      icon: CreditCard,
      title: 'Easy Returns',
      description: '30-day money back guarantee',
      color: 'from-purple-500 to-pink-500',
      delay: '0.2s',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer service',
      color: 'from-orange-500 to-red-500',
      delay: '0.3s',
    },
    {
      icon: RefreshCw,
      title: 'Quality Guarantee',
      description: 'Premium quality products',
      color: 'from-indigo-500 to-blue-500',
      delay: '0.4s',
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive pricing always',
      color: 'from-pink-500 to-rose-500',
      delay: '0.5s',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 side-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInDown">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Choose ShopHub?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We provide the best shopping experience with unmatched service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fadeInUp overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              {/* Background Gradient on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Icon */}
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                {/* Floating particles effect */}
                <div
                  className={`absolute top-0 left-0 w-2 h-2 bg-gradient-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping`}
                />
              </div>

              {/* Content */}
              <h3
                className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              >
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
