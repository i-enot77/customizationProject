@echo off
setlocal enabledelayedexpansion

:: Set the input and output directories
set "INPUT_DIR=C:\Users\maiko\Desktop\materials\metal\metal10"
set "OUTPUT_DIR=C:\Users\maiko\Desktop\materials\metal\compressed10"

:: Full path to the basisu executable installed by vcpkg
set "BASISU_PATH=C:\Users\maiko\Desktop\vcpkg\installed\x64-windows\tools\basisu\basisu.exe"

:: Create the output directory if it doesn't exist
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

:: Loop through all image files in the input directory
for %%f in ("%INPUT_DIR%\*.png" "%INPUT_DIR%\*.jpg" "%INPUT_DIR%\*.jpeg") do (
    :: Get the base name of the file (without extension)
    set "filename=%%~nf"
    
    :: Compress the file to KTX2 format
    "%BASISU_PATH%" -ktx2 "%%f" -output_file "%OUTPUT_DIR%\!filename!.ktx2"
    echo Compressed %%f to %OUTPUT_DIR%\!filename!.ktx2
)

endlocal
echo All textures have been compressed.
