/**
 * Mock de login via email e senha
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ name: string, role: string, token: string }>}
 */
export function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Usuários de teste
      const users = [
        {
          email: "admin@teste.com",
          password: "admin123",
          role: "admin",
          name: "Admin User",
        },
        {
          email: "support@teste.com",
          password: "support123",
          role: "support",
          name: "Support User",
        },
        {
          email: "member@teste.com",
          password: "member123",
          role: "member",
          name: "Membro User",
        },
      ];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        reject(new Error("Email ou senha incorretos"));
      } else {
        resolve({
          name: user.name,
          role: user.role,
          token: "mock-token-" + user.role,
        });
      }
    }, 500); // Simula delay de rede
  });
}

/**
 * Mock de logout
 * @returns {Promise<void>}
 */
export function mockLogout() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 200); // delay pequeno
  });
}
