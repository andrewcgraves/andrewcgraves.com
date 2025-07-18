{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=25.05";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in
  {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs =  with pkgs; [
        yarn
        nodejs_24
      ];

      SAMPLE_ENV = "test";

      # shellHook = "zsh";
    };
  };
}
