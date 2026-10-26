---
'node-insim': minor
---

Honor the `UDPPort` option per the InSim spec: when connected via UDP, bind to the specified port instead of always using an ephemeral one; when connected via TCP with a non-zero `UDPPort`, open a secondary UDP socket to receive `IS_NLP` / `IS_MCI` packets LFS redirects there
