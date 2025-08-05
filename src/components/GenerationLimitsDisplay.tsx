import React from 'react';
import { 
  Crown, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGenerationLimits } from '@/hooks/useGenerationLimits';

interface GenerationLimitsDisplayProps {
  generationType: 'image' | 'video';
  onUpgrade?: () => void;
}

export const GenerationLimitsDisplay: React.FC<GenerationLimitsDisplayProps> = ({
  generationType,
  onUpgrade
}) => {
  const { limits, loading, fetchLimits } = useGenerationLimits();

  React.useEffect(() => {
    fetchLimits(generationType);
  }, [generationType, fetchLimits]);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!limits) {
    return null;
  }

  const isFreePlan = limits.plan_type === 'free';
  const canGenerate = limits.can_generate;
  const remaining = limits.remaining_daily;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isFreePlan ? (
            <Crown className="w-5 h-5 text-yellow-600" />
          ) : (
            <Zap className="w-5 h-5 text-purple-600" />
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {isFreePlan ? 'Free Plan' : 'Pro Plan'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {generationType === 'image' ? 'Image' : 'Video'} Generation Limits
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {canGenerate ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Daily Limits */}
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {limits.daily_used} / {limits.daily_limit}
            </div>
            <div className="text-xs text-gray-500">
              {remaining} remaining
            </div>
          </div>
        </div>

        {/* Monthly Limits */}
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {limits.monthly_used} / {limits.monthly_limit}
            </div>
            <div className="text-xs text-gray-500">
              {limits.remaining_monthly} remaining
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Daily Usage</span>
            <span>{Math.round((limits.daily_used / limits.daily_limit) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                limits.daily_used / limits.daily_limit > 0.8 
                  ? 'bg-red-500' 
                  : limits.daily_used / limits.daily_limit > 0.5 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((limits.daily_used / limits.daily_limit) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Limit Exceeded Warning */}
        {!canGenerate && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700 dark:text-red-300">
              Daily limit reached. Try again tomorrow or upgrade your plan.
            </span>
          </div>
        )}

        {/* Upgrade Prompt for Free Users */}
        {isFreePlan && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
                <p className="text-sm text-purple-100">
                  Get unlimited {generationType} generations and more features
                </p>
              </div>
              <Button
                onClick={onUpgrade}
                variant="secondary"
                size="sm"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Upgrade
              </Button>
            </div>
          </div>
        )}

        {/* Reset Timer */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>Resets daily at midnight UTC</span>
        </div>
      </div>
    </div>
  );
}; 