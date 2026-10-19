Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# 1. Background Gradient
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$cTop = [System.Drawing.Color]::FromArgb(255, 15, 23, 42)    # #0F172A slate-900
$cBottom = [System.Drawing.Color]::FromArgb(255, 30, 58, 138) # #1E3A8A blue-900
$linBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $cTop, $cBottom, 45.0)
$g.FillRectangle($linBrush, $rect)

# 2. Subtle Glow Circle
$glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 59, 130, 246)) # blue-500 alpha 35
$g.FillEllipse($glowBrush, 800, -100, 600, 600)
$emeraldGlow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 16, 185, 129)) # emerald alpha 25
$g.FillEllipse($emeraldGlow, -100, 300, 500, 500)

# 3. Draw App Logo Icon (Square rounded tile)
$tileX = 80
$tileY = 75
$tileSize = 90
$tileBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 64, 175)) # #1E40AF
$g.FillRectangle($tileBrush, $tileX, $tileY, $tileSize, $tileSize)

# Calculator screen inside tile
$screenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36)) # Gold
$g.FillRectangle($screenBrush, ($tileX + 14), ($tileY + 14), ($tileSize - 28), 18)

# Buttons inside tile
$btnBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 255, 255))
for ($r = 0; $r -lt 3; $r++) {
    for ($c = 0; $c -lt 3; $c++) {
        $bx = $tileX + 16 + ($c * 20)
        $by = $tileY + 42 + ($r * 13)
        $g.FillRectangle($btnBrush, $bx, $by, 14, 8)
    }
}

# 4. Brand Name
$fontBrand = New-Object System.Drawing.Font("Segoe UI", 44, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.DrawString("CalcMaster", $fontBrand, $whiteBrush, 190, 75)

# India badge next to name
$badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 5, 150, 105)) # Emerald
$g.FillRectangle($badgeBrush, 550, 92, 100, 42)
$fontBadge = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Bold)
$g.DrawString("India", $fontBadge, $whiteBrush, 568, 97)

# 5. Main Headline
$fontH1 = New-Object System.Drawing.Font("Segoe UI", 36, [System.Drawing.FontStyle]::Bold)
$goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36))
$g.DrawString("Free Online Calculators for India", $fontH1, $goldBrush, 80, 190)

# Subtitle
$fontSub = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Regular)
$lightGrayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 203, 213, 225)) # slate-300
$g.DrawString("Fast, 100% Free, Private & Accurate Financial, Tax & Math Tools", $fontSub, $lightGrayBrush, 80, 255)

# 6. Feature Pills / Tiles (2 rows of 3)
$categories = @(
    "EMI & Loans (Home, Car, Personal)",
    "SIP & Mutual Fund Compounding",
    "Income Tax FY 2025-26 (Old vs New)",
    "GST Calculator (Add & Remove)",
    "Land Unit Converter (Bigha, Katha)",
    "Sarkari Exam Age Eligibility"
)

$fontPill = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Bold)
$pillBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 30, 41, 59)) # slate-800 semi
$pillBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 59, 130, 246), 1.5)

for ($i = 0; $i -lt $categories.Count; $i++) {
    $row = [Math]::Floor($i / 3)
    $col = $i % 3
    $px = 80 + ($col * 350)
    $py = 330 + ($row * 70)
    $pw = 330
    $ph = 52
    
    $g.FillRectangle($pillBg, $px, $py, $pw, $ph)
    $g.DrawRectangle($pillBorder, $px, $py, $pw, $ph)
    
    # Text
    $text = $categories[$i]
    $g.DrawString($text, $fontPill, $whiteBrush, ($px + 14), ($py + 14))
}

# 7. Bottom Trust Bar
$barBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
$g.FillRectangle($barBrush, 0, 545, $width, 85)
$borderTop = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 58, 138), 2)
$g.DrawLine($borderTop, 0, 545, $width, 545)

$fontFooter = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Regular)
$footerMuted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
$g.DrawString("Instant Results  •  No Signup Required  •  PDF & Excel Reports  •  Updated for FY 2025-26", $fontFooter, $footerMuted, 80, 575)

$fontUrl = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
$g.DrawString("www.calcmaster.co.in", $fontUrl, $goldBrush, 940, 574)

# Save
$outPath = "D:\calculator\public\og-image.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Host "Generated $outPath successfully!"
