import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Star, GitFork } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const GitHubStats = ({ username = "ArjunDivraniya" }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile data
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch GitHub profile');
        }

        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        const reposData = reposResponse.ok ? await reposResponse.json() : [];

        // Calculate stats
        let totalStars = 0;
        let totalForks = 0;
        let topLanguages = {};

        reposData.forEach((repo) => {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;
          if (repo.language) {
            topLanguages[repo.language] = (topLanguages[repo.language] || 0) + 1;
          }
        });

        // Get top languages
        const sortedLanguages = Object.entries(topLanguages)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang]) => lang);

        const transformedData = {
          username: userData.login,
          name: userData.name || userData.login,
          avatar: userData.avatar_url,
          bio: userData.bio || 'Developer & Code Enthusiast',
          followers: userData.followers || 0,
          following: userData.following || 0,
          publicRepos: userData.public_repos || 0,
          totalStars,
          totalForks,
          topLanguages: sortedLanguages,
          profileUrl: userData.html_url,
          company: userData.company || 'Not specified',
          location: userData.location || 'Not specified',
          blog: userData.blog || null,
          email: userData.email || null,
          twitterHandle: userData.twitter_username || null,
          reposCount: reposData.length,
          createdAt: userData.created_at,
        };

        setGithubData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        
        // Use mock data as fallback
        const mockData = {
          username: username,
          name: 'Arjun Divraniya',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          bio: 'Full Stack Developer | React | Node.js | MERN Stack',
          followers: 50,
          following: 30,
          publicRepos: 68,
          totalStars: 450,
          totalForks: 120,
          topLanguages: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python'],
          profileUrl: `https://github.com/${username}`,
          company: 'Freelancer',
          location: 'India',
          blog: null,
          email: null,
          twitterHandle: null,
          reposCount: 68,
          createdAt: '2021-01-15T10:20:30Z',
        };
        
        setGithubData(mockData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: '0 25px 50px rgba(88, 166, 255, 0.3)',
      transition: { duration: 0.3 },
    },
  };

  if (loading && !githubData) {
    return (
      <div
        ref={ref}
        className="flex items-center justify-center p-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (!githubData) {
    return (
      <div className="text-red-400 text-center p-8">
        <p>Unable to load GitHub data.</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Header Card */}
      <motion.div
        variants={itemVariants}
        whileHover="hover"
        className="mb-6"
      >
        <motion.div
          variants={cardHoverVariants}
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.img
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              src={githubData.avatar}
              alt={githubData.username}
              className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg"
            />

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-2">
                <FaGithub className="w-5 h-5 text-gray-300" />
                <h3 className="text-2xl font-bold text-white">
                  {githubData.name}
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">@{githubData.username}</p>
              <p className="text-gray-400 text-sm mb-3">{githubData.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                {githubData.followers > 0 && (
                  <span className="text-blue-400">👥 {githubData.followers} Followers</span>
                )}
                {githubData.publicRepos > 0 && (
                  <span className="text-green-400">📦 {githubData.publicRepos} Repos</span>
                )}
                {githubData.totalStars > 0 && (
                  <span className="text-yellow-400">⭐ {githubData.totalStars} Stars</span>
                )}
              </div>

              <motion.a
                href={githubData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
              >
                View GitHub Profile
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Repos */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-lg p-4 text-center"
        >
          <p className="text-blue-400 text-xs font-semibold mb-2">Repositories</p>
          <p className="text-2xl font-bold text-white">{githubData.publicRepos}</p>
        </motion.div>

        {/* Total Stars */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-500/30 rounded-lg p-4 text-center"
        >
          <p className="text-yellow-400 text-xs font-semibold mb-2">Total Stars</p>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <p className="text-2xl font-bold text-white">{githubData.totalStars}</p>
          </div>
        </motion.div>

        {/* Total Forks */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-lg p-4 text-center"
        >
          <p className="text-green-400 text-xs font-semibold mb-2">Total Forks</p>
          <div className="flex items-center justify-center gap-1">
            <GitFork className="w-4 h-4 text-green-400" />
            <p className="text-2xl font-bold text-white">{githubData.totalForks}</p>
          </div>
        </motion.div>

        {/* Followers */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-lg p-4 text-center"
        >
          <p className="text-purple-400 text-xs font-semibold mb-2">Followers</p>
          <p className="text-2xl font-bold text-white">{githubData.followers}</p>
        </motion.div>
      </motion.div>

      {/* Top Languages */}
      {githubData.topLanguages && githubData.topLanguages.length > 0 && (
        <motion.div variants={itemVariants} className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Top Languages</h4>
          <div className="flex flex-wrap gap-2">
            {githubData.topLanguages.map((lang, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-500/50 rounded-full text-blue-300 text-sm font-medium hover:border-blue-400 transition-all"
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Additional Info */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-800/30 border border-gray-700/30 rounded-lg p-4 space-y-2 text-sm"
      >
        {githubData.location && (
          <p className="text-gray-400">
            📍 <span className="text-gray-300">{githubData.location}</span>
          </p>
        )}
        {githubData.company && (
          <p className="text-gray-400">
            🏢 <span className="text-gray-300">{githubData.company}</span>
          </p>
        )}
        {githubData.twitterHandle && (
          <p className="text-gray-400">
            𝕏 <span className="text-gray-300">@{githubData.twitterHandle}</span>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GitHubStats;
