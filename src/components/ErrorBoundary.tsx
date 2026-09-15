import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Alon Aninag caught runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleClearStorageAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F5F2] dark:bg-[#0B131A] text-[#2D3436] dark:text-[#E2E8F0] flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white dark:bg-[#131F2A] rounded-3xl p-8 border border-[#E5DAC4] dark:border-stone-800 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/50 text-[#C88A32] flex items-center justify-center mx-auto mb-5 border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="font-serif text-2xl font-bold text-[#2C241D] dark:text-white mb-2">
              Something went wrong loading Alon & Aninag
            </h1>

            <p className="text-sm text-[#6B5A48] dark:text-stone-300 leading-relaxed mb-6">
              A temporary runtime error occurred while rendering the resort application. You can reload the page or reset the saved session state below.
            </p>

            {this.state.error && (
              <div className="bg-[#FAF7F2] dark:bg-[#080E14] p-3.5 rounded-xl border border-[#DDD0B9] dark:border-stone-700 text-left text-xs font-mono text-stone-700 dark:text-stone-300 mb-6 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#006D77] hover:bg-[#00545c] text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleClearStorageAndReload}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#FAF7F2] dark:hover:bg-stone-700 text-[#2C241D] dark:text-stone-200 border border-[#DDD0B9] dark:border-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-amber-600" />
                <span>Reset Local Data & Reload</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
