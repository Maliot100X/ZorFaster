import { Trophy, CheckCircle, Gift } from 'lucide-react';

export default function More() {
  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">More</h1>
      
      {/* Rankings */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold flex items-center gap-2">
            <Trophy className="text-yellow-500" size={20} />
            Top Creators
          </h2>
          <span className="text-xs text-neutral-500">Monthly Pool: $500</span>
        </div>
        
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
          {[
            { rank: 1, name: '@maliot', prize: '$50', color: 'text-yellow-400' },
            { rank: 2, name: '@basegod', prize: '$25', color: 'text-neutral-300' },
            { rank: 3, name: '@zora_fan', prize: 'Sub', color: 'text-orange-400' },
          ].map((user) => (
            <div key={user.rank} className="flex items-center justify-between p-4 border-b border-neutral-800 last:border-0">
              <div className="flex items-center gap-3">
                <span className={`font-bold w-6 ${user.color}`}>#{user.rank}</span>
                <div className="w-8 h-8 bg-neutral-800 rounded-full"></div>
                <span className="font-medium text-sm">{user.name}</span>
              </div>
              <span className="text-xs font-bold bg-neutral-800 px-2 py-1 rounded">{user.prize}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quests */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold flex items-center gap-2">
            <Gift className="text-purple-500" size={20} />
            Daily Quests
          </h2>
          <span className="text-xs text-neutral-500">Reset: 12h 30m</span>
        </div>

        <div className="space-y-2">
          {[
            { task: 'Follow @ZorFaster', reward: '10 XP', done: true },
            { task: 'Repost Game', reward: '50 XP', done: false },
            { task: 'Launch a Coin', reward: '100 XP', done: false },
          ].map((quest, i) => (
            <div key={i} className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-full ${quest.done ? 'bg-green-500/20 text-green-500' : 'bg-neutral-800 text-neutral-600'}`}>
                  <CheckCircle size={16} />
                </div>
                <span className={`text-sm ${quest.done ? 'text-neutral-500 line-through' : ''}`}>
                  {quest.task}
                </span>
              </div>
              <span className="text-xs font-bold text-purple-400">{quest.reward}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
