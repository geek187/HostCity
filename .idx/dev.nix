# Firebase Studio workspace configuration for HostCity
# FIFA World Cup 2026 Host City Guide App
# https://firebase.google.com/docs/studio/customize-workspace

{ pkgs, ... }: {
  # Use stable Nix channel for reliable builds
  channel = "stable-24.05";

  # System packages required for React Native + Expo development
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
    pkgs.git
    pkgs.watchman
    pkgs.jdk17
    pkgs.curl
    pkgs.unzip
  ];

  # Environment variables
  env = {
    EXPO_DEVTOOLS_LISTEN_ADDRESS = "0.0.0.0";
  };

  # IDE extensions for React Native + TypeScript development
  idx.extensions = [
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "dsznajder.es7-react-js-snippets"
    "msjsdiag.vscode-react-native"
    "bradlc.vscode-tailwindcss"
    "eamodio.gitlens"
    "christian-kohler.path-intellisense"
    "vscode-icons-team.vscode-icons"
    "usernamehw.errorlens"
  ];

  # Workspace lifecycle hooks
  idx.workspace = {
    onCreate = {
      npm-install = "npm install";
    };
    onStart = {
      welcome = "echo 'HostCity - FIFA World Cup 2026' && echo 'Run: npm start'";
    };
  };

  # App preview configuration
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = ["npx" "expo" "start" "--web" "--port" "$PORT"];
        manager = "web";
      };
    };
  };
}
