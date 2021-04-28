# https://stackoverflow.com/a/58392953
from IPython import get_ipython
sx = lambda s: get_ipython().run_line_magic("sx", s)

inputs = sx("ls -a | grep 'software-instruments'")
st = ' '.join(inputs)
sx("! pandoc -d instruments.yaml instruments-header.md {st} instruments-references.md")

print("output in instruments.pdf, unless instruments.yaml overrides")