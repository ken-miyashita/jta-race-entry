import { useEffect } from "react";

/**
 * セッションストレージの認証状態を確認し、管理者として認証済みの場合はisAdminをtrueに設定するカスタムフック
 *
 * 使い方:
 * ```tsx
 * const [isAdmin, setIsAdmin] = useState(false);
 * useAdmin(setIsAdmin);
 *
 * if (!isAdmin) {
 *   return <AdminLogin />;
 * }
 * return <AdminContent />;
 * ```
 *
 * @param setIsAdmin - 認証状態を更新する関数
 */
export const useAdmin = (setIsAdmin: (isAdmin: boolean) => void) => {
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setIsAdmin(true);
    }
  }, [setIsAdmin]);
};
