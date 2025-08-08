import styles from "./Skeleton.module.scss";

export function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonItem}></div>
      <div className={styles.skeletonItem}></div>
      <div className={styles.skeletonItem}></div>
    </div>
  );
}
