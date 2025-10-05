{
  description = "node-js-flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

      in rec {
        devShells.default = pkgs.mkShell {
          buildInputs = [ pkgs.nodejs_20 pkgs.nodePackages.npm ];
        };
      }
    );
}
