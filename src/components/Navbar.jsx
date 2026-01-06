import { FileText, BarChart3, Zap, LogOut, User } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">ResumeAI</span>
              <span className="text-xs text-muted-foreground">ATS Analyzer</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Zap className="h-4 w-4" />
              History
            </a>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{user.name || user.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
