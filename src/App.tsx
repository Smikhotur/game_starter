import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import { firebaseAuth } from "./firebase";
import { Routes } from "./routes";
import { getUserInfo } from "./app/store/actions/user";
import { RootState } from "./app/store";
import messagesRu from "./lang/ru.json";

const messages = {
  ru: messagesRu,
  en: {},
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      dispatch(getUserInfo(user?.uid));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { lang } = useSelector((state: RootState) => state.local);

  return (
    <IntlProvider messages={messages[lang]} locale={lang} defaultLocale="en">
      <Suspense
        fallback={
          <div>
            <FormattedMessage id="test" defaultMessage="Loading..." />
          </div>
        }
      >
        <Routes />
      </Suspense>
    </IntlProvider>
  );
}

export default App;
