'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Users,
  Globe,
  Building,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/animated-background';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email Us',
    description: 'Get a response within 24 hours',
    value: 'hello@digigateglobal.com',
    href: 'mailto:hello@digigateglobal.com',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'Technical Support',
    description: '24/7 dedicated support team',
    value: 'support@digigateglobal.com',
    href: 'mailto:support@digigateglobal.com',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Enterprise Sales',
    description: 'Custom solutions for your business',
    value: 'sales@digigateglobal.com',
    href: 'mailto:sales@digigateglobal.com',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: 'Partnerships',
    description: 'Build with us',
    value: 'partners@digigateglobal.com',
    href: 'mailto:partners@digigateglobal.com',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
  },
];

const officeLocations = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'San Francisco HQ',
    description: '123 Innovation Drive, San Francisco, CA 94107',
    color: 'text-blue-500',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Remote First',
    description: 'Team distributed across 15+ countries',
    color: 'text-green-500',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Support Hours',
    description: '24/7 global support coverage',
    color: 'text-purple-500',
  },
];

const faqItems = [
  {
    question: 'What is your typical response time?',
    answer:
      'We respond to all inquiries within 24 hours. Enterprise and support requests are prioritized and typically answered within 2-4 hours.',
  },
  {
    question: 'Do you offer custom enterprise solutions?',
    answer:
      'Yes, we specialize in custom enterprise deployments with dedicated support, custom integrations, and SLA guarantees.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'We offer a 14-day free trial for all paid plans with full access to all features and support.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'We offer 24/7 technical support, dedicated account management for enterprise customers, and comprehensive documentation.',
  },
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated async submission – replace with API call when backend endpoint is ready.
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative border-b border-gray-200/40 py-16 md:py-24 dark:border-gray-800/50">
        <div className="container-default">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <Badge variant="glass" className="px-4 py-2 backdrop-blur-xl">
                <MessageCircle className="h-4 w-4 mr-2" />
                Get in Touch
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Let&apos;s <GradientText>Build Together</GradientText>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to scale your API infrastructure? Our team is here to help you build secure,
              scalable solutions tailored to your business needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-20">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactMethods.map((method) => (
              <motion.div key={method.title} variants={itemVariants}>
                <Card className="h-full backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div
                      className={`mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {method.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {method.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={method.href}
                      className="font-medium text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all"
                    >
                      {method.value}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="enterprise">Enterprise Solution</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    {/* Submit Status */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">
                          Message sent successfully! We&apos;ll get back to you soon.
                        </span>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      >
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Something went wrong. Please try again.</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Office Information */}
              <Card className="backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Our Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {officeLocations.map((location) => (
                    <div key={location.title} className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${location.color}`}>
                        {location.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{location.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{location.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Support */}
              <Card className="backdrop-blur-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-red-900 dark:text-red-100 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Emergency Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                    For critical production issues requiring immediate attention.
                  </p>
                  <a
                    href="tel:+1-555-EMERGENCY"
                    className="inline-flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    +1 (555) EMERGENCY
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
