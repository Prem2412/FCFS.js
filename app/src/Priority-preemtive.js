function priorityPreemtive(){
    let clock=p[0].arrivalTime;
    let completed=0;
    let currentProcesses,currentProcess;
    let executionQueueNames='';
    let executionQueueDurations='';
    let oldCurrentProcess={name:'any name'};
    let clockAtStart=0;
    let pInOrder=[];

    for(let i=0;i<numberOfProcesses.value;i++){
        p[i].passedBurstTime=0;
    }

    for(i=0;;i++){
        if (completed>=numberOfProcesses.value){
            executionQueueNames+=oldCurrentProcess.name+' ';
            //
            if(clock-clockAtStart>oldCurrentProcess.burstTime)
                    executionQueueDurations+=(oldCurrentProcess.burstTime).toString()+' ';
            else
                executionQueueDurations+=(clock-clockAtStart).toString()+' ';
            //
            break;
        }

        currentProcesses=p.filter((pr)=>{
            return (pr.arrivalTime<=clock && !pr.completed);
        });
        
        if (currentProcesses.length>0) {
            currentProcess=currentProcesses[0];
            for(let i=0;i<currentProcesses.length;i++){
                if(currentProcesses[i].priority<currentProcess.priority) {
                    currentProcess=currentProcesses[i];
                }
            } 
        } else {
            clock++;
            continue;
        }

        //console.log('currentProcesses', currentProcesses);
        //console.log('currentProcess', currentProcess);
        //console.log(clock);
        currentProcess.passedBurstTime+=1;
        if(i!==0)
            if(oldCurrentProcess.name!==currentProcess.name){
                //console.log('I GOT INTO FIRST IF');
                //oldCurrentProcess.passedBurstTime+=clock-clockAtStart;
                executionQueueNames+=oldCurrentProcess.name+' ';
                //
                if(clock-clockAtStart>oldCurrentProcess.burstTime)
                    executionQueueDurations+=(oldCurrentProcess.burstTime).toString()+' ';
                else
                    executionQueueDurations+=(clock-clockAtStart).toString()+' ';
                //
                clockAtStart=clock;
            }

        if(currentProcess.firstCycle){
            //console.log('I GOT INTO SECOND IF');
            currentProcess.startAt=clock;
            currentProcess.firstCycle=false;
            clockAtStart=clock;
        }
        if(currentProcess.passedBurstTime>=currentProcess.burstTime){
            //console.log('I GOT INTO THIRD IF');
            currentProcess.finishAt=clock+1;
            currentProcess.completed=true;
            completed++;
        }
        
        clock=clock+1;


        for(let i=0;i<numberOfProcesses.value;i++){
            if(p[i].name===currentProcess.name){
                p[i]=currentProcess;
            }
            if(p[i].name===oldCurrentProcess.name){
                p[i]=oldCurrentProcess;
            }
        }


        oldCurrentProcess=currentProcess;

    }

    //console.log('executionQueueNames',executionQueueNames);
    //console.log('executionQueueDurations',executionQueueDurations);
    finalize(p,executionQueueNames,executionQueueDurations);
}