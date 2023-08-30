
export interface Comment {
    id: string,
    content: string,
    parentId: string | null,
    like: number,
    dislike: number,
    answer?: Comment[], 
    amountComments?: number
}

const comments: Comment[] = [
    
    {
        id: "c001",
        content: "Primeiro comentário da rede social.",
        parentId: null,
        like: 0,
        dislike: 0
    },
    {
        id: "c002",
        content: "Vou comprar a casa dos milhonários.",
        parentId: null,
        like: 5,
        dislike: 1
    },
    {
        id: "c003",
        content: "Nada disso eu sou o primeiro, mesmo sendo o terceiro.",
        parentId: "c001",
        like: 1,
        dislike: 6
    },
    {
        id: "c004",
        content: "Faltou bem pouco para ser eu o primeiro.",
        parentId: "c001",
        like: 3,
        dislike: 0
    },
    {
        id: "c005",
        content: "Eu não ligo para isso, o importante é que comentei.",
        parentId: "c004",
        like: 7,
        dislike: 2
    },
    {
        id: "c006",
        content: "Eu também não importo com essa coisas.",
        parentId: "c005",
        like: 3,
        dislike: 3
    },

]

const getComments = (comments: Comment[], parentId: string | null = null) => {

    const result = [];

    for (const comment of comments) {
        if (comment.parentId === parentId) {
            const children = getComments(comments, comment.id);
            if (children.length > 0) {
                comment.answer = children;
                comment.amountComments = children.length;
            }else{
                comment.answer = [];
                comment.amountComments = children.length;
            }
            result.push(comment);
        }
    }
    return result;
}

const commentsPosts = getComments(comments)

console.log(comments);

const displayComments = (comment: Comment, level = 0) => {
    const indent = '  '.repeat(level);
    console.log(`${indent}- ID: ${comment.parentId || comment.id} ${comment.content} (Likes: ${comment.like}, Dislikes: ${comment.dislike})`);

    if (comment.answer) {
        for (const child of comment.answer) {
            displayComments(child, level + 1);
        }
    }
}

for (const comment of commentsPosts) {
    displayComments(comment);
}