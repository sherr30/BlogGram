/**
 * FOOTER COMPONENT
 * 
 * Simple footer displayed at the bottom of all pages.
 * Supports dark mode via Tailwind classes.
 */

import { BlogIcon } from '../ui/Icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BlogIcon className="w-7 h-7 text-purple-400" />
              <span className="text-xl font-bold text-purple-400">BlogGram</span>
            </div>
            <p className="text-gray-400 text-sm">
              Share your thoughts and read amazing stories from writers around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/create" className="hover:text-blue-400 transition-colors">Create Post</a></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Built With</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">React</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">Redux</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">Tailwind</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BlogGram - Built with React + Redux + Context API
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made by Sreyansh Srivastava
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
