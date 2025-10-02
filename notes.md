# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Commands
| Command   | Description                                         |
|-----------|-----------------------------------------------------|
| `echo`    | Output the parameters of the command                |
| `cd`      | Change directory                                    |
| `mkdir`   | Make directory                                      |
| `rmdir`   | Remove directory                                    |
| `rm`      | Remove file(s)                                      |
| `mv`      | Move file(s)                                        |
| `cp`      | Copy files                                          |
| `ls`      | List files                                          |
| `curl`    | Command line client URL browser                     |
| `grep`    | Regular expression search                           |
| `find`    | Find files                                          |
| `top`     | View running processes with CPU and memory usage    |
| `df`      | View disk statistics                                |
| `cat`     | Output the contents of a file                       |
| `less`    | Interactively output the contents of a file         |
| `wc`      | Count the words in a file                           |
| `ps`      | View the currently running processes                |
| `kill`    | Kill a currently running process                    |
| `sudo`    | Execute a command as a super user (admin)           |
| `ssh`     | Create a secure shell on a remote computer          |
| `scp`     | Securely copy files to a remote computer            |
| `history` | Show the history of commands                        |
| `ping`    | Check if a website is up                            |
| `tracert` | Trace the connections to a website                  |
| `dig`     | Show the DNS information for a domain               |
| `man`     | Look up a command in the manual                     |


## AWS

My server's elastic IP address: 54.87.181.99

Domain: [myhabitat.click](https://myhabitat.click) &rarr; opens it on the web

### How to SSH into my server
In Git Bash, run:

`ssh -i [key pair file] ubuntu@[ip address]`
>key pair file is the .pem file downloaded locally

### HTTPS and


## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I played around with the HTML of the Simon game. I was able to add this page to my website: [https://simon.myhabitat.click](https://simon.myhabitat.click).

I'm pretty comfortable with the main structural components of HTML as I have used them before. However, I was less familiar with many of its input elements. Here's some notes to reference what they are:

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |


## CSS

This was a lot of fun for me, and not too hard as I do a lot of CSS work at my job. However, it took me several hours because I am a bit of a perfectionist. Because of my experience, I don't need to take many notes over CSS, but I did find this really helpful Flexbox Cheat Sheet that I referenced quite a bit while coding:

![Flexbox Cheat Sheet](https://preview.redd.it/vd9dc7wfk9471.png?width=1080&crop=smart&auto=webp&s=a76f999c5919ea54062092686816e9647c4cd5af)
>This was really helpful because I am a visual learner and there are a lot of properties to remember.

I also did some research on the display property. I've used `block`, `inline`, and `flex` before, but I didn't really understand the differences between them. Here are some notes I took:


| Value         | Behavior                                                                 
|---------------|--------------------------------------------------------------------------|
| `block`     | Starts on a new line, fills container width                              |
| `inline`    | Flows with text, only as wide as content                                 | 
| `inline-block` | Flows inline *but* accepts width/height/margin like block             | 
| `none`      | Element not rendered; removed from layout                                |
| `flex`      | Container uses flexbox model, children become flex items                 |
| `inline-flex` | Same as flex but container behaves inline                              |
| `grid`      | Container uses grid model, children arranged in rows/cols                |

---

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
