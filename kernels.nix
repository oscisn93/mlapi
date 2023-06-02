{pkgs, ...}: {
  kernel.python.scientific = {
    enable = true;
    extraPackages = ps: [ps.numpy];
  };
  kernel.bash.scripting_cli.enable = true;
}
