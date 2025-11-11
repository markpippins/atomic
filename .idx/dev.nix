# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.jdk
    pkgs.python3
    pkgs.nodejs
    pkgs.maven
    pkgs.docker
  ];

  # Enable Docker and MySQL services
  services.docker.enable = true;
  # services.mysql.enable = true;
  # services.mysql.initialRootPassword = "supersecret";
  #docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=supersecret -p 3306:3306 -d mysql:8.0   

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with BROKER_PROXY_PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     BROKER_PROXY_PORT = "$PORT";
        #   };
        # };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Clean up mysql data to ensure a clean start
        cleanup-mysql = "sudo rm -rf /var/lib/mysql";
      };
    };
  };
}
