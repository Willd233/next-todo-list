import dayjs from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";
import { useLocale } from "next-intl";
import styles from "./styles/TodoStyles.module.scss";

export const Time = () => {
  const locale = useLocale();

  if (locale === "es") {
    dayjs.locale("es");
  } else {
    dayjs.locale("en");
  }
  const day = dayjs().format("dddd");
  const time = dayjs().format("MMMM D, YYYY");

  return (
    <div className={styles.date}>
      <h1>{day}</h1>
      <h4>{time}</h4>
    </div>
  );
};
