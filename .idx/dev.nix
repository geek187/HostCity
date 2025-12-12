# Firebase Studio workspace configuration for HostCity
# FIFA World Cup 2026 Host City Guide App
# https://firebase.google.com/docs/studio/customize-workspace

{ pkgs, ... }: {
  # Use stable Nix channel for reliable builds
  channel = "stable-24.05";

  # System packages required for React Native + Expo development
  packages = [
    # Node.js runtime
    pkgs.nodejs_20
    
    # Package managers
    pkgs.yarn
    
    # Git for version control
    pkgs.git
    
    # Watchman for file watching (React Native)
    pkgs.watchman
    
    # Java for Android builds
    pkgs.jdk17
    
    # Useful CLI tools
    pkgs.curl
    pkgs.unzip
    pkgs.ripgrep
    
    # Google Cloud SDK for Firebase
    (pkgs.google-cloud-sdk.withExtraComponents [
      pkgs.google-cloud-sdk.components.gcloud-man-pages
    ])
  ];

  # Environment variables
  env = {
    # Expo configuration
    EXPO_DEVTOOLS_LISTEN_ADDRESS = "0.0.0.0";
    
    # Android SDK paths (if needed)
    JAVA_HOME = "${pkgs.jdk17}";
    
    # Firebase project (configure as needed)
    # FIREBASE_PROJECT_ID = "hostcity-2026";
  };

  # IDE extensions for React Native + TypeScript development
  idx.extensions = [
    # TypeScript & JavaScript
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    
    # React & React Native
    "dsznajder.es7-react-js-snippets",
    "msjsdiag.vscode-react-native",
    
    # Tailwind CSS (for styling reference)
    "bradlc.vscode-tailwindcss",
    
    # Git integration
    "eamodio.gitlens",
    
    # Path autocomplete
    "christian-kohler.path-intellisense",
    
    # Bracket colorization
    "CoenraadS.bracket-pair-colorizer-2",
    
    # Icons
    "vscode-icons-team.vscode-icons",
    
    # Firebase
    "toba.vsfire",
    
    # REST client for API testing
    "humao.rest-client",
    
    # Error lens for inline errors
    "usernamehw.errorlens"
  ];

  # Workspace lifecycle hooks
  idx.workspace = {
    # Run when workspace is created
    onCreate = {
      # Install npm dependencies
      npm-install = "npm install";
    };
    
    # Run when workspace starts
    onStart = {
      # Display welcome message
      welcome = '''
        echo "🏟️ Welcome to HostCity - FIFA World Cup 2026 Host City Guide"
        echo ""
        echo "Quick commands:"
        echo "  npm start        - Start Expo development server"
        echo "  npm run android  - Run on Android"
        echo "  npm run ios      - Run on iOS (requires macOS)"
        echo "  npm run web      - Run in web browser"
        echo ""
      ''';
    };
  };

  # App preview configuration
  idx.previews = {
    enable = true;
    previews = {
      # Web preview for Expo
      web = {
        command = [
          "npx",
          "expo",
          "start",
          "--web",
          "--port",
          "$PORT"
        ];
        manager = "web";
        # Working directory
        cwd = ".";
      };
      
      # Android preview (if Android SDK available)
      android = {
        command = [
          "npx",
          "expo",
          "start",
          "--android",
          "--port",
          "$PORT"
        ];
        manager = "web";
      };
    };
  };
}