import React, { useState } from 'react';
import { SendHorizonal, MessageSquare, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { teams } from '@/utils/teamData';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: number;
  user: string;
  team: string;
  message: string;
  time: string;
  likes: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    user: 'Rohit_Fan',
    team: 'mi',
    message: "MI looking strong this season! Can't wait to see Bumrah in action again.",
    time: '5m ago',
    likes: 24,
  },
  {
    id: 2,
    user: 'ChennaiSuper',
    team: 'csk',
    message: 'CSK forever! We’ve got the best captain in IPL history.',
    time: '12m ago',
    likes: 31,
  },
  {
    id: 3,
    user: 'ViratKing',
    team: 'rcb',
    message: 'This is our year! RCB will finally lift the trophy in 2025.',
    time: '18m ago',
    likes: 15,
  },
  {
    id: 4,
    user: 'CricketExpert',
    team: 'dc',
    message: 'The quality of cricket this season has been phenomenal. Young Indian talent shining!',
    time: '22m ago',
    likes: 19,
  },
];

const FanZone = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('mi');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      user: 'You',
      team: selectedTeam,
      message: newComment.trim(),
      time: 'Just now',
      likes: 0,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const handleLike = (id: number) => {
    setComments(
      comments.map(comment =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="fan-zone" className="section-container">
      {/* Section Header */}
      <motion.div
        className="mb-12 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="pill-tag mb-4">JOIN THE CONVERSATION</span>
        <h2 className="section-title">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Fan Zone
          </span>
        </h2>
        <p className="section-subtitle">
          Connect with fellow cricket enthusiasts and share your thoughts on the matches.
        </p>
      </motion.div>

      <motion.div
        className="glass p-8 rounded-2xl max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-bold">Live Chat</h3>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-white/70" />
            <span className="text-white/70 text-sm">{1205 + comments.length} fans online</span>
          </div>
        </div>

        {/* Comment Form */}
        <motion.form
          onSubmit={handleSubmitComment}
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <label className="text-sm text-white/70">Your team:</label>
            <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-none">
              {teams.map(team => (
                <motion.button
                  key={team.id}
                  type="button"
                  onClick={() => setSelectedTeam(team.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedTeam === team.id
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={team.logo} alt={team.name} className="w-6 h-6 object-contain" />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <motion.button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
              disabled={newComment.trim() === ''}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SendHorizonal className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.form>

        {/* Comments */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-none">
          <AnimatePresence>
            {comments.map((comment, index) => {
              const team = teams.find(t => t.id === comment.team);

              return (
                <motion.div
                  key={comment.id}
                  className="bg-white/5 p-4 rounded-xl"
                  variants={commentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        {team && (
                          <img src={team.logo} alt={team.name} className="w-5 h-5 object-contain" />
                        )}
                      </div>
                      <span className="font-medium ml-2">{comment.user}</span>
                      <span className="text-xs text-white/50 ml-2">{comment.time}</span>
                    </div>
                    <motion.button
                      onClick={() => handleLike(comment.id)}
                      className="text-xs flex items-center text-white/70 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Award className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </motion.button>
                  </div>
                  <p className="text-sm text-white/90">{comment.message}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            variant="outline"
            className="border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
          >
            Load More Comments
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FanZone;