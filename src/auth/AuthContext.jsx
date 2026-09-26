import {
    createContext,
    useContext,
    useState, 
    useEffect
} from "react";

const AuthContext = createContext(null);
function createAdmin() {
    const users =
        JSON.parse(
            localStorage.getItem("addis-eats-users")
        ) || [];

    const adminExists = users.some(
        (user) => user.email === "admin@addiseats.com"
    );

    if (adminExists) {
        return;
    }

    const admin = {
        id: "admin-001",
        name: "Addis Eats Admin",
        email: "admin@addiseats.com",
        phone: "0900000000",
        password: "admin123",
        role: "admin"
    };

    localStorage.setItem(
        "addis-eats-users",
        JSON.stringify([
            ...users,
            admin
        ])
    );
}


export function AuthProvider({ children }) {
    
    const [user, setUser] = useState(() => {
        const savedUser =
            localStorage.getItem("addis-eats-user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });
    useEffect(() => {
    createAdmin(); }, []);

    function register(userData) {
        const users =
            JSON.parse(
                localStorage.getItem("addis-eats-users")
            ) || [];

        const existingUser = users.find(
            (item) => item.email === userData.email
        );

        if (existingUser) {
            return {
                success: false,
                message: "Email already registered."
            };
        }

        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            role: "customer"
        };

        localStorage.setItem(
            "addis-eats-users",
            JSON.stringify([
                ...users,
                newUser
            ])
        );

        return {
            success: true
        };
    }

    function login(email, password) {

        const users =
            JSON.parse(
                localStorage.getItem("addis-eats-users")
            ) || [];

        const foundUser = users.find(
            (item) =>
                item.email === email &&
                item.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        const loggedInUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone,
            role: foundUser.role
        };

        setUser(loggedInUser);

        localStorage.setItem(
            "addis-eats-user",
            JSON.stringify(loggedInUser)
        );

        return {
            success: true,
            user: loggedInUser
        };
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("addis-eats-user");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}