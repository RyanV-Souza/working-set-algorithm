const workingSet = (windowSize, pages) => {
    let workingSet = []
    let timeLimit = null
    
    for(let x = 0 ; x < pages.length; x++){
        console.log(`--------------`)
        if(workingSet.length == windowSize){
            
            let response = workingSet.findIndex((work) => work.page == pages[x])
            if(response > -1){
                workingSet[response].time = 0
            
                viewPages(workingSet)
            } else {
                let currentIndex = workingSet.reduce((prev, current) => {
                    return (prev.time > current.time) ? prev : current
                })
                
                currentIndex = workingSet.findIndex((work) => work == currentIndex) 
                
                workingSet.splice(currentIndex, 1)
                
                workingSet.map((work, index) => {
                    work.time += 1
                })
                
                workingSet.push({page: pages[x], time: 0})
                
                viewPages(workingSet)
            }
        } else {
            
            
            if(workingSet.length > 0){
                workingSet.map((work, index) => {
                    work.time += 1
                })
            }
            
            let response = workingSet.findIndex((work) => work.page == pages[x])
            
            if(response == -1) {
                workingSet.push({page: pages[x], time: 0 })
                viewPages(workingSet)
            } else {
                workingSet[response].time = 0
                viewPages(workingSet)
            }
            
        }
        
        timeLimit = workingSet.findIndex((work) => work.time >= 2)
                
                if(timeLimit > -1){
                    workingSet.splice(timeLimit, 1)
        }
    }
  }
  
  const viewPages = (workingSet) =>{
      workingSet.forEach((set) => {
          console.log(`Page: ${set.page}`)
      })
  }
  
  let pages =  [7,0,1,2,0,3,0,4,2,2,2,3,2,1,2,0]
  
  workingSet(3, pages)