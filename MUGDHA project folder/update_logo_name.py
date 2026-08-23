import glob

html_files = glob.glob(r'c:\MUGDHA project folder\*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Mugdha Construction variants in site-logo__name
    old_tag1 = '<span class="site-logo__name">Mugdha Constructions</span>'
    old_tag2 = '<span class="site-logo__name">Mugdha Construction</span>'
    old_tag3 = '<span class="site-logo__name">Mugdha Construction LLP</span>'
    new_tag = '<span class="site-logo__name">Mugdha Constructions LLP</span>'
    
    updated = content.replace(old_tag1, new_tag).replace(old_tag2, new_tag).replace(old_tag3, new_tag)
    
    if updated != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated)
        print(f"Updated {filepath}")
