import { useEffect } from "react";

/**
 * セッションストレージの認証状態を確認し、管理者として認証済みの場合はisAdminをtrueに設定するカスタムフック
 *
 * 使い方:
 * ```tsx
 * const [isAdmin, setIsAdmin] = useState(undefined);
 * useAdmin(setIsAdmin);
 *
 * if (isAdmin === undefined) {
 *   return <p>認証中...</p>; // 認証状態が未確認の場合
 * } else if (!isAdmin) {
 *   return <AdminLogin />; // 認証状態が確認済みで管理者でない場合
 * } else {
 *   return <AdminContent />; // 認証状態が確認済みで管理者の場合
 * }
 * ```
 *
 * @param setIsAdmin - 認証状態を更新する関数
 */
export const useAdmin = (
  setIsAdmin: (isAdmin: boolean | undefined) => void
) => {
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [setIsAdmin]);
};
