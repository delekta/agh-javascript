var hTags = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
var hTagsArray = Array.from(hTags)
var list = document.getElementsByTagName("ul")[0];

// Needed To Quickly Find Place For New Li Tag
var isActive = []
for(var i = 0; i < hTagsArray.length; i++){
    isActive.push(false)
}

hTags.forEach((hTag) => {
    hTag.addEventListener('click', function(){
        let index = hTagsArray.indexOf(hTag)
        let searchedAnchor = document.getElementById(`h${index}`)
        
        if(searchedAnchor == null){
            // Add Anchor Before H Tag
            let anchor = document.createElement('a')
            anchor.id = `h${index}` 
            var parentNode = hTag.parentNode;
            parentNode.insertBefore(anchor, hTag)
    
            // Adding Li To List
            let wrapperLi = document.createElement("li")
            let ref = document.createElement("a");
            ref.textContent = hTag.textContent;
            ref.href = `#${anchor.id}`
            isActive[index] = true;

            // Finding Place To Insert New Li Tag
            // I Look For First Element Which Is Before Ours
            i = index - 1
            while(i >= 0 && !isActive[i]){
                i--;
            }
            wrapperLi.appendChild(ref)
            if(i >= 0){
                var beforeTag = list.querySelectorAll(`a[href='#h${i}']`)[0];
                var wrapperBeforeTag = beforeTag.parentNode;
                insertAfter(wrapperLi, wrapperBeforeTag)
            }else{
                // Insert To First Place
                list.insertBefore(wrapperLi, list.firstChild);
            }
            
        }else{
            // Removing Anchor
            var searchedParent = searchedAnchor.parentNode;
            searchedParent.removeChild(searchedAnchor)

            // Removing Li Tagn From List
            var anchorToRemove = list.querySelectorAll(`a[href='#h${index}']`)[0]
            var wrapperAnchorToRemove = anchorToRemove.parentNode;
            list.removeChild(wrapperAnchorToRemove)
            isActive[index] = false
        }

    })
})

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}