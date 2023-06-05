{pkgs, ...}: {
  kernel.python.mlai = {
    enable = true;
    name = "python311";
    displayName = "Python version 3.11";

    extraPackages = ps: [
      ps.numpy
      ps.pandas
      ps.matplotlib
    ];
  };
  kernel.haskell.fn_scriptes.enable = true;
  kernel.bash.scripting_cli.enable = true;
}
