import re

def style_str_to_dict(s):
    if not s.strip(): return '{}'
    rules = [x.strip() for x in s.split(';') if x.strip()]
    props = []
    for r in rules:
        if ':' not in r: continue
        k, v = r.split(':', 1)
        k = k.strip()
        v = v.strip().replace("'", "\\'")
        k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
        props.append(f"{k}: '{v}'")
    return '{ ' + ', '.join(props) + ' }'

with open('hp.html', 'r', encoding='utf-8') as f:
    html = f.read()

style_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
styles = style_match.group(1) if style_match else ''

body_match = re.search(r'<body>(.*?)</body>', html, re.DOTALL)
body = body_match.group(1) if body_match else ''

body = body.replace('class="', 'className="')

def style_replacer(match):
    return 'style={' + style_str_to_dict(match.group(1)) + '}'

body = re.sub(r'style="([^"]*)"', style_replacer, body)

body = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', body)
body = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', body)
body = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1 />', body)

svg_attrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'fill-rule', 'clip-rule', 'stroke-miterlimit']
for attr in svg_attrs:
    camel = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), attr)
    body = body.replace(f'{attr}="', f'{camel}="')

tsx = f"""import React from 'react';
import Head from 'next/head';

export default function HomePage2() {{
  return (
    <>
      <Head>
        <title>One Dollar. One Child. One Future.</title>
      </Head>
      <style dangerouslySetInnerHTML={{{{
        __html: `{styles.replace('`', '\\`')}`
      }}}} />
{body}
    </>
  );
}}
"""

with open('home-page2.tsx', 'w', encoding='utf-8') as f:
    f.write(tsx)

print('Converted successfully')
