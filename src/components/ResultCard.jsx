import { CheckCircle2, XCircle, AlertTriangle, TrendingUp, Award, Target, Lightbulb, Brain } from 'lucide-react';

// Score indicator component
const ScoreIndicator = ({ score, label, size = 'lg' }) => {
  const percentage = typeof score === 'number' ? score : parseFloat(score) || 0;
  const getColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };
  
  const getBgColor = () => {
    if (percentage >= 80) return 'bg-success/10';
    if (percentage >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl ${getBgColor()}`}>
      <span className={`${size === 'lg' ? 'text-4xl' : 'text-2xl'} font-bold ${getColor()}`}>
        {percentage.toFixed(0)}%
      </span>
      <span className="text-sm text-muted-foreground mt-1">{label}</span>
    </div>
  );
};

// Badge component for skills/keywords
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// List item with icon
const ListItem = ({ icon: Icon, children, variant = 'default' }) => {
  const iconColors = {
    default: 'text-muted-foreground',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-destructive',
  };

  return (
    <li className="flex items-start gap-3 py-2">
      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColors[variant]}`} />
      <span className="text-sm text-foreground">{children}</span>
    </li>
  );
};

// Section component
const Section = ({ title, icon: Icon, children }) => (
  <div className="space-y-3">
    <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
      {Icon && <Icon className="h-5 w-5 text-primary" />}
      {title}
    </h4>
    {children}
  </div>
);

// Semantic Match Result
const SemanticMatchResult = ({ data }) => {
  const matchScore = data?.match_score || data?.semantic_score || data?.score || 0;
  const verdict = data?.verdict || data?.recommendation || '';
  const missingSkills = data?.missing_skills || data?.gaps?.skills || [];
  const missingExperience = data?.missing_experience || data?.gaps?.experience || [];
  const matchedSkills = data?.matched_skills || data?.matches?.skills || [];

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreIndicator score={matchScore} label="Match Score" />
        <div className="md:col-span-2 flex items-center p-6 rounded-2xl bg-secondary/50">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Analysis Verdict</p>
            <p className="text-foreground">{verdict || 'Resume analysis complete'}</p>
          </div>
        </div>
      </div>

      {/* Matched Skills */}
      {matchedSkills.length > 0 && (
        <Section title="Matched Skills" icon={CheckCircle2}>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, i) => (
              <Badge key={i} variant="success">{skill}</Badge>
            ))}
          </div>
        </Section>
      )}

      {/* Missing Skills */}
      {missingSkills.length > 0 && (
        <Section title="Missing Skills" icon={Target}>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <Badge key={i} variant="error">{skill}</Badge>
            ))}
          </div>
        </Section>
      )}

      {/* Missing Experience */}
      {missingExperience.length > 0 && (
        <Section title="Experience Gaps" icon={AlertTriangle}>
          <ul className="space-y-1">
            {missingExperience.map((exp, i) => (
              <ListItem key={i} icon={XCircle} variant="warning">{exp}</ListItem>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
};

// Quality Score Result
const QualityScoreResult = ({ data }) => {
  const overallScore = data?.overall_score || data?.quality_score || data?.score || 0;
  const breakdown = data?.breakdown || data?.categories || {};
  const issues = data?.issues || data?.problems || [];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="flex justify-center">
        <ScoreIndicator score={overallScore} label="ATS Quality Score" size="lg" />
      </div>

      {/* Score Breakdown */}
      {Object.keys(breakdown).length > 0 && (
        <Section title="Quality Breakdown" icon={Award}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(breakdown).map(([key, value]) => (
              <div key={key} className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-2xl font-bold text-primary">{value}%</p>
                <p className="text-xs text-muted-foreground capitalize mt-1">
                  {key.replace(/_/g, ' ')}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Issues Found */}
      {issues.length > 0 && (
        <Section title="Issues Found" icon={AlertTriangle}>
          <ul className="space-y-1 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
            {issues.map((issue, i) => (
              <ListItem key={i} icon={XCircle} variant="error">{issue}</ListItem>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
};

// Improvement Suggestions Result
const ImprovementResult = ({ data }) => {
  const suggestions = data?.suggestions || data?.improvements || [];
  const priority = data?.priority_actions || data?.quick_wins || [];
  const sections = data?.section_improvements || {};

  return (
    <div className="space-y-6">
      {/* Priority Actions */}
      {priority.length > 0 && (
        <Section title="Priority Actions" icon={TrendingUp}>
          <div className="space-y-3">
            {priority.map((action, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground">{action}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* General Suggestions */}
      {suggestions.length > 0 && (
        <Section title="Improvement Suggestions" icon={Lightbulb}>
          <ul className="space-y-1">
            {suggestions.map((suggestion, i) => (
              <ListItem key={i} icon={CheckCircle2} variant="success">{suggestion}</ListItem>
            ))}
          </ul>
        </Section>
      )}

      {/* Section-specific Improvements */}
      {Object.keys(sections).length > 0 && (
        <div className="space-y-4">
          {Object.entries(sections).map(([section, tips]) => (
            <Section key={section} title={section.replace(/_/g, ' ')}>
              <ul className="space-y-1 p-4 rounded-xl bg-secondary/50">
                {Array.isArray(tips) ? tips.map((tip, i) => (
                  <ListItem key={i} icon={Lightbulb}>{tip}</ListItem>
                )) : (
                  <ListItem icon={Lightbulb}>{tips}</ListItem>
                )}
              </ul>
            </Section>
          ))}
        </div>
      )}
    </div>
  );
};

// ML Score Result
const MLScoreResult = ({ data }) => {
  const predictedScore = data?.predicted_score || data?.ml_score || data?.score || 0;
  const confidence = data?.confidence || data?.accuracy || 0;
  const factors = data?.contributing_factors || data?.features || [];

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreIndicator score={predictedScore} label="ML Predicted Score" />
        <ScoreIndicator score={confidence} label="Confidence Level" />
      </div>

      {/* Contributing Factors */}
      {factors.length > 0 && (
        <Section title="Contributing Factors" icon={Brain}>
          <div className="space-y-3">
            {factors.map((factor, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {typeof factor === 'object' ? factor.name : factor}
                  </span>
                  {typeof factor === 'object' && factor.impact && (
                    <Badge variant={factor.impact > 0 ? 'success' : 'error'}>
                      {factor.impact > 0 ? '+' : ''}{factor.impact}%
                    </Badge>
                  )}
                </div>
                {typeof factor === 'object' && factor.description && (
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

// Main Result Card Component
const ResultCard = ({ type, data, isLoading }) => {
  const titles = {
    semantic: { title: 'Semantic Match Analysis', icon: Target, emoji: '🎯' },
    quality: { title: 'Resume Quality Score', icon: Award, emoji: '📊' },
    improve: { title: 'Improvement Suggestions', icon: Lightbulb, emoji: '✨' },
    ml: { title: 'ML Score Prediction', icon: Brain, emoji: '🤖' },
  };

  const { title, emoji } = titles[type] || { title: 'Analysis Result', emoji: '📄' };

  if (isLoading) {
    return (
      <div className="card-elevated p-8 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{emoji}</span>
          <div className="h-6 w-48 bg-muted rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-24 bg-muted rounded-xl" />
          <div className="h-16 bg-muted rounded-xl" />
          <div className="h-16 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Handle error responses
  if (data.error) {
    return (
      <div className="card-elevated p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <XCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{data.error}</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (type) {
      case 'semantic':
        return <SemanticMatchResult data={data} />;
      case 'quality':
        return <QualityScoreResult data={data} />;
      case 'improve':
        return <ImprovementResult data={data} />;
      case 'ml':
        return <MLScoreResult data={data} />;
      default:
        // Fallback: Display raw JSON
        return (
          <pre className="p-4 rounded-xl bg-secondary/50 overflow-auto text-xs text-foreground">
            {JSON.stringify(data, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div className="card-elevated p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{emoji}</span>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      {renderContent()}
    </div>
  );
};

export default ResultCard;
