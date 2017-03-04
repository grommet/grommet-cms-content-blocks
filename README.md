# Grommet CMS Content Blocks
Pluggable content blocks built for the Grommet Content Management System.

__NOTICE__:
This repository is under active development.  Please check back at a later time for a proper release, or use at your own risk!

# Scripts
1. Replace the content blocks from another repo:
- `npm run copy`: Note that the script expects the content blocks to be in `../brand-central-cms/src/js/components/ContentBlocks`
  you can adjust the script as needed in the package.json if you need them to come from a different path.

2. Ship the module to npm
- `npm run shipit`: Will copy the blocks, check into git and publish.