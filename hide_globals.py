import os

files = [
    'src/components/Footer.tsx',
    'src/components/Navbar.tsx',
    'src/components/TrustBadgeStrip.tsx'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the admin check to include /home2
    content = content.replace(
        'if (pathname?.startsWith("/admin")) return null;',
        'if (pathname?.startsWith("/admin") || pathname === "/home2") return null;'
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated 3 components')
