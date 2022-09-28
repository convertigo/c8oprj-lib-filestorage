


# lib_FileStorage

Core library to store, list, delete files in the server workspace


For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Sequences](#sequences)
    - [addFile](#addfile)
    - [deleteFile](#deletefile)
    - [init](#init)
    - [initForSession](#initforsession)
    - [listFiles](#listfiles)


## Installation

1. In your Convertigo Studio use `File->Import->Convertigo->Convertigo Project` and hit the `Next` button
2. In the dialog `Project remote URL` field, paste the text below:
   <table>
     <tr><td>Usage</td><td>Click the copy button</td></tr>
     <tr><td>To contribute</td><td>

     ```
     lib_FileStorage=git@github.com:convertigo/c8oprj-lib-filestorage.git:branch=8.1.x
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_FileStorage=git@github.com:convertigo/c8oprj-lib-filestorage/archive/8.1.x.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_FileStorage__ project


## Sequences

### addFile

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>file</td><td>file to store</td>
</tr>
<tr>
<td>id</td><td>(optional) id to store file, override if exists, generated if empty</td>
</tr>
<tr>
<td>lifetime</td><td>(optional) file lifetime in minutes, -1 for never expire</td>
</tr>
</table>

### deleteFile

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>id</td><td></td>
</tr>
</table>

### init

### initForSession

### listFiles

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>limit</td><td></td>
</tr>
<tr>
<td>skip</td><td></td>
</tr>
</table>



