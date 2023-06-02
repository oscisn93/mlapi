{pkgs, ...}: {
  kernel.python.iPython = {
    enable = true;
    
    extraPackages = ps: [
      ps.numpy
      ps.fastapi
      ps.uvicorn
      ps.loguru
      ps.pyngrok
      ps.nest_asyncio 
    ];
  };
  kernel.bash.scripting_cli.enable = true;
}
