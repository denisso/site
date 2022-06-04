import { WrapperComponents } from "./components/PageWrapper";
import { ThemeProvider } from "./features/theming";

function App() {
    return (
        <>
            <ThemeProvider>
                <WrapperComponents />
            </ThemeProvider>
        </>
    );
}

export default App;
