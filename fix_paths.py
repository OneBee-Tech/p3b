import re

with open('src/app/home2/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("url('hero-bg.jpg')", "url('/hero-bg.jpg')")
content = content.replace('src="classroom.png"', 'src="/classroom.png"')
content = content.replace('src="underdeveloped class.png"', 'src="/underdeveloped class.png"')
content = content.replace('src="icons8-teacher-32.png"', 'src="/icons8-teacher-32.png"')

# Ensure HTML comments inside JSX are replaced
content = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', content)

with open('src/app/home2/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Paths and comments fixed')
