import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, Award } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import GitHubStats from './GitHubStats';
import LinkedInCard from './LinkedInCard';

const LeetCodeProfile = ({ username = "Arjun_divraniya" }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching LeetCode data for:', username);
        
        // Use Alfa LeetCode API with correct endpoint
        let response = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('API response status:', response.status);
        
        let data = null;
        
        if (response.ok) {
          data = await response.json();
          console.log('API data:', data);
        } else {
          console.warn('Primary API failed, trying base profile endpoint...');
          // Try base profile endpoint as fallback
          const altResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          console.log('Alternative API response status:', altResponse.status);
          
          if (altResponse.ok) {
            data = await altResponse.json();
            console.log('Alternative API data:', data);
            // If using base endpoint, also fetch solved stats
            try {
              const solvedResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
              if (solvedResponse.ok) {
                const solvedData = await solvedResponse.json();
                data = { ...data, ...solvedData };
                console.log('Merged with solved data:', data);
              }
            } catch (e) {
              console.warn('Unable to fetch solved stats:', e);
            }
          } else {
            console.warn('Alternative API also failed');
          }
        }
        
        // Process data if available
        if (data) {
          let totalSolved = 0, easySolved = 0, mediumSolved = 0, hardSolved = 0;
          let avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
          let realUsername = username;
          let ranking = data.ranking || 'N/A';
          let contributionPoints = data.contributionPoint || data.reputation || 0;
          
          // Handle Alfa LeetCode API format
          if (data.totalSolved !== undefined) {
            totalSolved = data.totalSolved || 0;
            easySolved = data.easySolved || 0;
            mediumSolved = data.mediumSolved || 0;
            hardSolved = data.hardSolved || 0;
          }
          
          // Handle solvedProblem field (alternative field name)
          if (data.solvedProblem !== undefined) {
            totalSolved = data.solvedProblem || 0;
          }
          
          // Get username and avatar from API
          if (data.username) {
            realUsername = data.username;
          }
          if (data.avatar) {
            avatar = data.avatar;
          }
          
          const transformedData = {
            username: realUsername,
            avatar: avatar,
            ranking: ranking,
            totalSolved: totalSolved,
            easySolved: easySolved,
            mediumSolved: mediumSolved,
            hardSolved: hardSolved,
            contributionPoints: contributionPoints,
            badges: data.badges || [],
            contestRating: data.contestRating || 0,
            totalContests: data.totalContests || 0,
            profileUrl: `https://leetcode.com/u/${username}`,
          };

          console.log('Transformed data:', transformedData);
          setProfileData(transformedData);
          setError(null);
          setLoading(false);
          return;
        }
        
        throw new Error('No data received from APIs');
      } catch (err) {
        console.error('Error fetching LeetCode data:', err);
        
        // Use mock data as fallback
        const mockData = {
          username: username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          ranking: 'N/A',
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          contributionPoints: 0,
          badges: [],
          contestRating: 0,
          totalContests: 0,
          profileUrl: `https://leetcode.com/u/${username}`,
        };
        
        console.log('Using fallback data (API error):', mockData);
        setProfileData(mockData);
        setError('Unable to fetch LeetCode data. Showing fallback data.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchLeetCodeData();
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
      boxShadow: '0 25px 50px rgba(199, 112, 240, 0.3)',
      transition: { duration: 0.3 },
    },
  };

  if (loading && !profileData) {
    return (
      <div
        ref={ref}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900/10 to-black"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div ref={ref} className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-center">
          <p>Unable to load profile data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const totalProblems = profileData.totalSolved;
  const easyPercentage = (profileData.easySolved / totalProblems) * 100 || 0;
  const mediumPercentage = (profileData.mediumSolved / totalProblems) * 100 || 0;
  const hardPercentage = (profileData.hardSolved / totalProblems) * 100 || 0;

  const dsaExpertise = [
    'Dynamic Programming',
    'Graph Theory',
    'Trees & Binary Search Trees',
    'Linked Lists',
    'Hash Tables',
    'Sorting Algorithms',
    'String Manipulation',
    'Sliding Window',
    'Two Pointers',
    'Backtracking',
  ];

  return (
    <motion.div
      ref={ref}
      id="leetcode"
      className="min-h-screen py-20 px-4 md:px-6 bg-gradient-to-b from-slate-950 via-purple-950/5 to-slate-950"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div className="max-w-6xl mx-auto mb-16" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4">
          <SiLeetcode className="w-8 h-8 text-yellow-400" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            LeetCode Profile
          </h2>
        </div>
        <p className="text-gray-300 text-lg">Competitive Programming & Problem Solving</p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto">
        {/* GitHub Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔗</span>
            <h3 className="text-2xl font-bold text-white">
              Developer Profile Stats
            </h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">Professional Network & Contributions</p>
          
          {/* Grid for GitHub and LinkedIn */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GitHubStats username="ArjunDivraniya" />
            <LinkedInCard profileUrl="https://www.linkedin.com/in/arjun-divraniya" />
          </div>
        </motion.div>

        {/* Header Card */}
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          className="mb-12"
        >
          <motion.div
            variants={cardHoverVariants}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <motion.img
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                src={profileData.avatar}
                alt={profileData.username}
                className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
              />

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {profileData.username}
                </h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Award className="w-5 h-5" />
                    <span className="text-lg font-semibold">
                      Global Rank: #{profileData.ranking}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    Contribution Points: {profileData.contributionPoints}
                  </div>
                </div>
                <motion.a
                  href={profileData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  View Full Profile
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/50 border border-yellow-500/30 rounded-lg p-4 text-center"
                >
                  <p className="text-yellow-400 text-sm font-semibold mb-1">
                    Total Solved
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {profileData.totalSolved}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4 text-center"
                >
                  <p className="text-cyan-400 text-sm font-semibold mb-1">
                    Contests
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {profileData.totalContests}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Problem Difficulty</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Easy */}
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-emerald-500/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(16, 185, 129, 0.1)"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - easyPercentage / 100)}`}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={inView ? { strokeDashoffset: 2 * Math.PI * 45 * (1 - easyPercentage / 100) } : {}}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-300">
                      {Math.round(easyPercentage)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">Easy Problems</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {profileData.easySolved}
                </p>
              </div>
            </motion.div>

            {/* Medium */}
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(250, 204, 21, 0.1)"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - mediumPercentage / 100)}`}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={inView ? { strokeDashoffset: 2 * Math.PI * 45 * (1 - mediumPercentage / 100) } : {}}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-300">
                      {Math.round(mediumPercentage)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">Medium Problems</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {profileData.mediumSolved}
                </p>
              </div>
            </motion.div>

            {/* Hard */}
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(239, 68, 68, 0.1)"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - hardPercentage / 100)}`}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={inView ? { strokeDashoffset: 2 * Math.PI * 45 * (1 - hardPercentage / 100) } : {}}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-300">
                      {Math.round(hardPercentage)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">Hard Problems</p>
                <p className="text-2xl font-bold text-red-400">
                  {profileData.hardSolved}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Badges Showcase */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Achievements & Badges</h3>
          <motion.div
            className="overflow-x-auto pb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex gap-4 min-w-min">
              {profileData.badges && profileData.badges.length > 0 ? (
                profileData.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="animate-float"
                  >
                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/30 rounded-xl p-6 flex flex-col items-center justify-center min-w-fit backdrop-blur-sm hover:border-purple-500/60 transition-all">
                      <div className="text-4xl mb-3">🏆</div>
                      <p className="text-white font-semibold text-sm text-center">
                        {badge.name}
                      </p>
                      {badge.rarity && (
                        <p className="text-xs text-purple-400 mt-2 capitalize">
                          {badge.rarity}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400">Loading badges...</p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Contest & Performance */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Contest Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Peak Contest Rating</p>
                  <p className="text-3xl font-bold text-purple-400">
                    {profileData.contestRating}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Total Contests</p>
                  <p className="text-3xl font-bold text-cyan-400">
                    {profileData.totalContests}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* DS&A Expertise */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            Data Structures & Algorithms Expertise
          </h3>
          <motion.div
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm"
            whileHover="hover"
            variants={cardHoverVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dsaExpertise.map((expertise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-purple-500/20 hover:border-purple-500/60 transition-all group cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 group-hover:scale-150 transition-transform" />
                  <span className="text-gray-200 group-hover:text-purple-400 transition-colors">
                    {expertise}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Description Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 pt-8 border-t border-purple-500/20"
            >
              <p className="text-gray-300 leading-relaxed mb-4">
                I've developed strong proficiency in core CS fundamentals, specializing in
                algorithm optimization and efficient problem-solving approaches. My focus areas
                include:
              </p>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>
                  • <span className="text-purple-400 font-semibold">Pattern Recognition</span>
                  : Identifying problem patterns to apply optimal solutions
                </p>
                <p>
                  • <span className="text-purple-400 font-semibold">Time Complexity</span>
                  : Writing O(n log n) and O(n) solutions through efficient algorithms
                </p>
                <p>
                  • <span className="text-purple-400 font-semibold">Problem Solving</span>
                  : Tackling a diverse range of DSA problems with strong competitive programming background
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={profileData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-400 hover:from-purple-600 hover:via-purple-700 hover:to-yellow-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Explore More on LeetCode
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeetCodeProfile;
