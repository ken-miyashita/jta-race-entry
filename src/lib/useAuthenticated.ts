import { useEffect } from "react";

/**
 * セッションストレージの認証状態を確認し、認証済みの場合はsetIsAuthenticatedをtrueに設定するカスタムフック
 *
 * 使い方:
 * ```tsx
 * const [isAuthenticated, setIsAuthenticated] = useState(false);
 * useAuthenticated(setIsAuthenticated);
 *
 * if (!isAuthenticated) {
 *   return <LoginForm />;
 * }
 * return <AuthenticatedContent />;
 * ```
 *
 * @param setIsAuthenticated - 認証状態を更新する関数
 */
export const useAuthenticated = (
  setIsAuthenticated: (isAuthenticated: boolean) => void
) => {
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);
};
